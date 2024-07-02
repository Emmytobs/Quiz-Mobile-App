import * as React from 'react';
import { TextInput, View } from 'react-native';
import { cn } from '~/lib/utils';
import { Label } from './label';
import { Text } from './text';

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
>(({ className, placeholderClassName, label, labelFor, ...props }, ref) => {
  {/* TODO: Fix the label bottom margin */}
  const hasLabel = label && labelFor;
  return (
    <View className={cn("w-full flex flex-col justify-between", hasLabel && 'gap-y-4')}>
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
      <TextInput
        ref={ref}
        className={cn(
          'web:flex h-10 native:h-16 w-full rounded-md border border-input bg-secondary/50 px-3 web:py-2 text-base lg:text-sm native:text-base native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        {...props}
      />
    </View>
  );
});

Input.displayName = 'Input';

export { Input };
