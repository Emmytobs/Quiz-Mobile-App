import * as React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { cn } from '~/lib/utils';
import { Label } from './label';
import { Eye, EyeOff } from '~/lib/icons';

type TextInputType = typeof TextInput
type CustomTextInputProps = React.ComponentPropsWithoutRef<TextInputType> & {
  /**
   * (Optional) The text for a label associated with the input
   */
  label?: string
  /**
   * This should be added if `label` is added. The value should be the same value of `aria-labelledbyledBy`
   */
  labelFor?: string
}

const Input = React.forwardRef<
  React.ElementRef<TextInputType>,
  CustomTextInputProps  
>(({ className, placeholderClassName, label, labelFor, secureTextEntry, ...props }, ref) => {
  const hasLabel = label && labelFor;
  const [isSecureText, setIsSecureText] = React.useState(secureTextEntry);

  const toggleSecureText = () => {
    setIsSecureText(!isSecureText)
  }

  return (
    <View className={cn("w-full flex flex-col justify-between", hasLabel && 'gap-y-2')}>
      {
        hasLabel ?
          <Label 
            nativeID={labelFor}
            className="text-primary"
          >
            {label} 
          </Label> :
          null
      }
      <View>
        <TextInput
          ref={ref}
          className={cn(
            'web:flex h-10 native:h-16 w-full rounded-md border border-input bg-secondary/50 px-3 web:py-2 text-base lg:text-sm native:text-base native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
            props.editable === false && 'opacity-50 web:cursor-not-allowed',
            className
          )}
          placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
          secureTextEntry={isSecureText}
          {...props}
        />
        {
          secureTextEntry ?
          (
            <Pressable className="absolute right-5 top-[30%]" onPress={toggleSecureText}>
              {
                isSecureText ?
                <EyeOff className="text-primary" /> :
                <Eye className="text-primary" />
              }
            </Pressable>
          ) : null
        }
      </View>
    </View>
  );
});

Input.displayName = 'Input';

export { Input };
