import Market from "@/views/(private)/market/Market.views";

interface Props {
  children: React.ReactNode;
}

async function Layout(props: Props) {
  const { children } = props;

  return <Market>{children}</Market>;
}

export default Layout;
