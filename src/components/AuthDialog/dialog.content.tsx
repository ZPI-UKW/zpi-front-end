import { useRect } from '../../hooks/useRect';
import SigninForm from '../Forms/signinForm';
import SignupForm from '../Forms/signupForm';
import { StyledDialogContent, FormWrapper } from './styles';
import { DialogContentProps } from './types';

const DialogContent = ({ contentType, setContentType }: DialogContentProps) => {
  const [signInSize, signInRef] = useRect();
  const [signUpSize, signUpRef] = useRect();

  return (
    <StyledDialogContent
      style={{
        minHeight:
          contentType === 'signin'
            ? `${(signInSize?.height || 300) + 10}px`
            : `${(signUpSize?.height || 480) + 10}px`,
        height:
          contentType === 'signin'
            ? `${(signInSize?.height || 300) + 10}px`
            : `${(signUpSize?.height || 480) + 10}px`,
      }}
    >
      <FormWrapper
        animate={
          contentType === 'signin'
            ? { x: 0, opacity: 1, position: 'relative', y: 0 }
            : { x: '-100%', opacity: 0, y: 0 }
        }
        transition={{ duration: 0.2 }}
      >
        <SigninForm setContentType={setContentType} ref={signInRef} />
      </FormWrapper>
      <FormWrapper
        initial={{ x: '100%', opacity: 0, y: 0 }}
        animate={
          contentType === 'signup'
            ? { x: 0, opacity: 1, position: 'relative', y: 0 }
            : { x: '100%', opacity: 0, y: 0 }
        }
        transition={{ duration: 0.2 }}
      >
        <SignupForm setContentType={setContentType} ref={signUpRef} />
      </FormWrapper>
    </StyledDialogContent>
  );
};

export default DialogContent;
