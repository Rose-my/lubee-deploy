import styled from "styled-components";
import { EditXIc } from "assets/index";
import { BtnWrapper } from "@styles/btnStyle";
import { CommentModalProps } from "home/today/types/CommentModalTypes";

export default function PartnerCommentModal(props: CommentModalProps) {
  const { handleCloseBtn, profileIconSrc, commentText, isDateDetailModal } = props;

  return (
    <Background>
      <Container $isDateDetailModal={isDateDetailModal}>
        <HeaderContainer>
          <ProfileIcon as={profileIconSrc} />
          <BtnWrapper type="button" onClick={handleCloseBtn}>
            <XIcon />
          </BtnWrapper>
        </HeaderContainer>
        <TextBox value={commentText} disabled />
      </Container>
    </Background>
  );
}

const Background = styled.div`
  position: absolute;
  z-index: 2;
  inset: 0;
  height: 100%;
  ${({ theme }) => theme.effects.dimmed_40};
`;

const Container = styled.section<{ $isDateDetailModal: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: ${({ $isDateDetailModal }) => ($isDateDetailModal ? "fixed" : "absolute")};
  top: 24rem;
  left: 5.6rem;
  width: 27.8rem;
  padding-bottom: 1.2rem;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const HeaderContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding: 1.2rem;
`;

const ProfileIcon = styled.svg`
  width: 3rem;
  height: 3rem;
`;

const TextBox = styled.textarea`
  ${({ theme }) => theme.fonts.SubTitle};

  overflow: hidden;
  width: 100%;
  padding: 0 1.2rem;
  border: none;
  resize: none;
  color: black;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_200};
  }
`;

const XIcon = styled(EditXIc)`
  width: 2.4rem;
  height: 2.4rem;
`;
