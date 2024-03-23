import { getProfile } from "@/actions/profiles"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { IconArrowRight, IconCircleCheckFilled } from "@tabler/icons-react"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FC } from "react"

export default async function JoinPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.getUser()

  let profile = null
  if (data.user) {
    profile = await getProfile(data.user.id)

    if (profile.membership === "pro") {
      return redirect("/dashboard")
    }
  }

  return (
    <div className="flex w-full flex-col p-5 pb-20">
      <div className="mt-2 flex flex-col items-center justify-center text-center md:mt-10">
        <div className="text-2xl font-extrabold md:text-4xl">Headline</div>

        <div className="text-md mt-4 md:mt-6 md:w-[500px] md:max-w-[740px] md:text-lg">
          Sentence
        </div>
      </div>

      {/* <Tabs
        className="mt-4 text-center md:mt-8"
        value={selectedTab}
        onValueChange={value => setSelectedTab(value as "month" | "year")}
      >
        <TabsList>
          <TabsTrigger className="text-xs" value="month">
            Month
          </TabsTrigger>

          <TabsTrigger className="text-xs" value="year">
            Year
          </TabsTrigger>
        </TabsList>
      </Tabs> */}

      <div className="mt-6 justify-center space-y-6 md:flex md:space-x-4 md:space-y-0">
        <PricingCard
          title="Pro"
          originalPrice={"$99"}
          discountedPrice={"$89"}
          // originalPrice={selectedTab === "month" ? "$29" : "$399"}
          // discountedPrice={selectedTab === "month" ? "$29" : "$299"}
          features={["Feature 1", "Feature 2", "Feature 3"]}
          buttonText="Reserve Spot"
          launchDate=""
          selectedTab={"year"}
          // selectedTab={selectedTab}
          profileId={profile ? profile.id : null}
        />
      </div>
    </div>
  )
}

interface PricingCardProps {
  title: string
  originalPrice: string
  discountedPrice: string
  features: string[]
  buttonText: string
  launchDate: string
  selectedTab: "month" | "year"
  profileId: string | null
}

const PricingCard: FC<PricingCardProps> = ({
  title,
  originalPrice,
  discountedPrice,
  features,
  buttonText,
  launchDate,
  selectedTab,
  profileId
}) => {
  return (
    <div className="flex w-full flex-col items-center rounded border p-4 md:w-[360px]">
      <div className="flex size-full flex-col items-center justify-between">
        <div>
          <div className="text-center text-4xl font-extrabold tracking-wide">
            {title}
          </div>

          <Badge className="mx-auto mt-3 flex w-[220px] justify-center bg-green-500 text-sm text-white">
            25% Discount
          </Badge>

          <div className="mt-3 text-center font-extrabold">
            <span className="space-x-2 text-4xl">
              <span className="line-through">{originalPrice}</span>
              <span>{discountedPrice}</span>
            </span>
            <span className="text-gray">
              {selectedTab === "month" ? "/mo" : "/yr"}
            </span>
          </div>

          <div className="mt-4 space-y-1">
            {features.map((feature, index) => (
              <Feature key={index} text={feature} />
            ))}
          </div>
        </div>

        <div>
          <Link
            href={
              profileId
                ? `${process.env.NEXT_PUBLIC_STRIPE_PREORDER_PAYMENT_LINK_YEARLY}?client_reference_id=${profileId}`
                : `/login?message=Please sign up to reserve your spot.`
            }
          >
            <Button className="text-md mx-auto mt-5 flex w-[160px] bg-blue-500 text-white hover:bg-blue-600">
              {buttonText}
              <IconArrowRight className="ml-1" size={20} />
            </Button>
          </Link>

          <div className="mt-2 text-sm italic">{launchDate}</div>
        </div>
      </div>
    </div>
  )
}

interface FeatureProps {
  text: string
}

const Feature: FC<FeatureProps> = ({ text }) => {
  return (
    <div className="flex items-center space-x-2">
      <IconCircleCheckFilled size={24} />

      <div>{text}</div>
    </div>
  )
}
