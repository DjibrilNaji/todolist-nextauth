import BackButton from "@/web/components/customs/CardWrapper/BackButton"
import Header from "@/web/components/customs/CardWrapper/Header"
import Social from "@/web/components/customs/CardWrapper/Social"
import { Card, CardContent, CardFooter, CardHeader } from "@/web/components/ui/card"

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel}></Header>
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
