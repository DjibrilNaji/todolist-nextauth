import { FaExclamationTriangle } from "react-icons/fa"

import CardWrapper from "@/web/components/customs/CardWrapper/CardWrapper"
import routes from "@/web/routes"

export default async function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref={routes.auth.login}
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <FaExclamationTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  )
}
