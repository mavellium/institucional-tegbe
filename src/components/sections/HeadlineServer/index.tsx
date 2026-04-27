import { Headline } from "../Headline";

type HeadlineVariant = "home" | "marketing" | "sobre";

interface Props {
  variant?: HeadlineVariant;
}

export default async function HeadlineWrapper({ variant }: Props) {
  const response = await fetch("https://janus.mavellium.com.br/api/tegbe-institucional/headline", {
    cache: "no-store",
  });

  const data = await response.json();

  return <Headline variant={variant} data={data} />;
}
