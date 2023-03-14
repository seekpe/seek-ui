import * as React from 'react';
import { capitalize } from '@yomarsanchez/utils';
export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  // if (false) {
  //   React.useEffect(() => {
  //     console.log('asd');
  //   }, []);
  // }

  return (
    <button style={{ padding: '16px' }} {...props}>
      {capitalize(children)}
    </button>
  );
}

Button.displayName = 'Button';
