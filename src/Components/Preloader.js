import React from "react";
import styled from "styled-components";

const Preloader = () => {
  return (
    <Wrapper>
      <div className="loader" />
      <p className="text">Loading...</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.9);
  z-index: 9999;

  .loader {
    width: 50px;
    height: 50px;
    border: 5px solid #e5e7eb;
    border-top: 5px solid #4f46e5;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .text {
    margin-top: 12px;
    font-size: 14px;
    color: #4f46e5;
    font-weight: 500;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Preloader;