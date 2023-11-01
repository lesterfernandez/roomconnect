import type { ReactNode } from "react";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Box h="100vh" display="flex" flexDirection="column">
      <Navbar />
      {children}
    </Box>
  );
}
