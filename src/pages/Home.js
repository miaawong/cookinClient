import React from "react";
import { Box, Grommet, Main } from "grommet";
export default function Home() {
    return (
        <Main height="xlarge">
            <Box
                direction="row"
                border={{ color: "black", size: "medium" }}
                margin="large"
                responsive={true}
            >
                <Box width="xxlarge" background="white">
                    Whats for dinner?{" "}
                </Box>
                <Box width="medium" background="yellow"></Box>
            </Box>
        </Main>
    );
}
