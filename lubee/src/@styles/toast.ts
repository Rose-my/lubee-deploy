import { ToastContainer } from "react-toastify";
import styled from "styled-components"; // styled-components import 수정

export const StyledToastContainer = styled(ToastContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8.2rem;

  .Toastify__toast {
    width: 268px;
    height: 40px;
    padding: 0;
    border-radius: 8.121px;
    background-color: ${({ theme }) => theme.colors.gray_700};
    box-shadow:
      0 4.061px 8.121px 3.045px rgb(0 0 0 / 15%),
      0 1.015px 3.045px 0 rgb(0 0 0 / 30%);
    color: ${({ theme }) => theme.colors.gray_50};
    text-align: center;
    ${({ theme }) => theme.fonts.Caption_2};
  }

  .Toastify__toast-container--bottom-center {
    bottom: 25rem;
  }
`;
