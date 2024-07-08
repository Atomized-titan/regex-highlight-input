# RegexHighlightInput Component

## Overview

RegexHighlightInput is a React component that provides real-time highlighting of text based on a given regular expression pattern. It allows users to input text while simultaneously highlighting portions that match the specified regex.

## Implementation

The component uses a combination of a hidden textarea and a visible div to achieve the highlighting effect while maintaining native input behavior:

1. **Hidden Textarea**: A transparent textarea overlays the entire component, capturing all user input. This ensures that cursor positioning, text selection, and other native input behaviors are preserved.

2. **Highlighted Content Div**: A div element sits behind the textarea, displaying the input text with highlighted portions. This div is updated in real-time as the user types.

3. **Regex Highlighting**: The component uses a regex pattern provided as a prop to determine which portions of the text should be highlighted. The highlighting is applied using inline spans with background colors.

4. **Synced Sizing**: The component ensures that the hidden textarea and the visible div always match in size, providing a seamless experience.

## Key Features

- Real-time highlighting based on regex patterns
- Preserves native input behavior (cursor positioning, selection, etc.)
- Customizable highlight color
- Placeholder support
- Flexible width

## Usage

```tsx
import RegexHighlightInput from './RegexHighlightInput';

function App() {
  const handleInputChange = (newValue: string) => {
    console.log('New value:', newValue);
  };

  return (
    <RegexHighlightInput 
      onChange={handleInputChange}
      highlightPattern={/\{\{.*?\}\}/g}
      placeholder="Enter text with {{variables}}"
      width="400px"
      highlightColor="rgba(255, 165, 0, 0.3)"
    />
  );
}
```

## Props

- `onChange`: (value: string) => void
- `highlightPattern`: RegExp
- `placeholder`: string (optional)
- `width`: string (optional)
- `highlightColor`: string (optional)

## Considerations and Trade-offs

### Why Not Use ContentEditable?

Initially, we explored using a contenteditable div for this component. However, we encountered several challenges:

1. **Cursor Position**: Maintaining the correct cursor position when updating the content of a contenteditable element is complex and error-prone.
2. **Cross-Browser Consistency**: Contenteditable behavior can vary across browsers, leading to inconsistent user experiences.
3. **Form Integration**: Contenteditable elements don't integrate as seamlessly with form controls as native input elements.

### Advantages of the Current Approach

1. **Native Input Behavior**: By using a hidden textarea, we leverage the browser's native input handling, ensuring consistent behavior for cursor positioning, text selection, and keyboard interactions.
2. **Separation of Concerns**: The input logic is separated from the highlighting logic, making the code easier to maintain and extend.
3. **Better Performance**: Updating the highlighted content is done efficiently without affecting the input behavior.

### Potential Downsides and Limitations

1. **Copy-Paste Behavior**: Users copying text from the component will get the plain text without highlighting. This might be unexpected if they can see the highlights.
2. **Mobile Compatibility**: On some mobile devices, the hidden textarea technique might lead to unexpected behavior with on-screen keyboards.
3. **Screen Readers**: The current implementation might not be optimal for screen readers. Additional ARIA attributes may be needed for better accessibility.

## Future Improvements

1. **Accessibility**: Enhance the component with proper ARIA attributes for better screen reader support.
2. **Multi-line Support**: Improve handling of multi-line input, ensuring proper wrapping and sizing.
3. **Performance Optimization**: For very large inputs, implement debouncing or more efficient update mechanisms.
4. **Custom Highlighting**: Allow for more complex highlighting scenarios, such as multiple patterns with different colors.

## Conclusion

The RegexHighlightInput component provides a robust solution for real-time text highlighting based on regex patterns. While it addresses many common issues associated with such implementations, it's important to consider the specific needs of your application, particularly in terms of accessibility and mobile support.
