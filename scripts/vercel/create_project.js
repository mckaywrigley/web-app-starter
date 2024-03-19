require("dotenv").config()

async function createVercelProject() {
  const teamId = process.env.VERCEL_TEAM_ID
  const token = process.env.VERCEL_ACCESS_TOKEN
  const projectName = process.env.PROJECT_NAME.toLocaleLowerCase()

  try {
    const response = await fetch(
      `https://api.vercel.com/v10/projects?teamId=${teamId}`,
      {
        method: "post",
        body: JSON.stringify({
          name: projectName,
          environmentVariables: [
            {
              key: "KEY",
              value: "VALUE",
              target: ["production", "development", "preview"], // one or more,
              type: "encrypted"
            }
          ],
          gitRepository: {
            repo: `mckaywrigley/${projectName}`,
            type: "github"
          }
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )

    if (response.ok) {
      const data = await response.json()
      console.log("Project created successfully:", data)
    } else {
      const errorData = await response.json()
      throw new Error(`Failed to create project: ${errorData.message}`)
    }
  } catch (error) {
    console.error("Error creating project:", error)
    throw error
  }
}

createVercelProject().catch(console.error)
