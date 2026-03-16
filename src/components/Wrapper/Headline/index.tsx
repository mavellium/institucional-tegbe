import { Headline } from "../../Section/Headline";

type HeadlineVariant = "home" | "marketing" | "sobre";

interface Props {
  variant?: HeadlineVariant;
}

export default async function HeadlineWrapper({ variant }: Props) {
  const response = await fetch(
    "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/headline",
    { cache: "no-store" }
  );

  const data = await response.json();

  return <Headline variant={variant} data={data} />;
}
