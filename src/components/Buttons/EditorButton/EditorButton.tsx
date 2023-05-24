import { EditorButtonProps } from './types';
import clsx from 'clsx';
import styles from './EditorButton.module.scss';
import Image from 'next/image';

const EditorButton = ({ onClick, disabled, src, alt }: EditorButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        styles.editorBtn,
        disabled ? styles.editorBtn_disable : styles.editorBtn_active
      )}
    >
      <Image src={src} alt={alt} />
    </button>
  );
};

export default EditorButton;
