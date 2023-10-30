import type { ReactNode } from "react";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Box minH="100vh">
      <Navbar />
      {children}
    </Box>
  );
}
