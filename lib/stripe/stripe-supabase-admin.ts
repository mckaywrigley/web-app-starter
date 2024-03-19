import { Membership } from "@/types/membership"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"
import { stripe } from "./stripe"

const getMembershipStatus = (
  status: Stripe.Subscription.Status,
  membership: Membership
): Membership => {
  switch (status) {
    case "active":
    case "trialing":
      return membership
    case "canceled":
    case "incomplete":
    case "incomplete_expired":
    case "past_due":
    case "paused":
    case "unpaid":
      return "free"
    default:
      return "free"
  }
}

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
)

export const updateCustomer = async (
  profileId: string,
  subscriptionId: string,
  customerId: string
) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"]
  })

  const { data } = await supabaseAdmin
    .from("profiles")
    .update({
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id
    })
    .eq("id", profileId)
    .select()
    .single()
    .throwOnError()
}

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  productId: string
) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"]
  })

  const product = await stripe.products.retrieve(productId)
  const membership = product.metadata.membership as Membership

  const membershipStatus = getMembershipStatus(subscription.status, membership)

  const { data: customerData } = await supabaseAdmin
    .from("profiles")
    .update({
      stripe_subscription_id: subscription.id,
      membership: membershipStatus
    })
    .eq("stripe_customer_id", customerId)
    .select()
    .single()
    .throwOnError()

  const { id: profileId } = customerData!
}
