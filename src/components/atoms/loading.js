import Lottie from "lottie-react";
import styled from "styled-components";
import loading from "./hand.json"
import cat from "./cat.json"
import small from "./small.json"

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(30, 30, 30, .8);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

export function Loading() {
  return (
    <Box>
      <div style={{ width: 400}}>
        <Lottie animationData={loading}/>
      </div>
    </Box>
  );
}

export function HomeLoading() {
  return (
    <div className="w-full center mt-30">
      <div style={{ width: 400}}>
        <Lottie animationData={cat}/>
      </div>
    </div>
  );
}

export function SmallLoading() {
  return (
    <div className="w-full center mt-30">
      <div style={{ width: 400}}>
        <Lottie animationData={small}/>
      </div>
    </div>
  );
}