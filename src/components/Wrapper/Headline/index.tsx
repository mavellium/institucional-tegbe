import { Headline } from "../../Section/Headline";

type HeadlineVariant = "home" | "ecommerce" | "marketing" | "sobre";

interface Props {
  variant?: HeadlineVariant;
}

export default async function HeadlineWrapper({ variant }: Props) {
  const response = await fetch(
    "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/headline",
    { cache: "force-cache" }
  );

  const data = await response.json();

  return <Headline variant={variant} data={data} />;
}
