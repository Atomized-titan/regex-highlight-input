import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface RegexHighlightInputProps {
  onChange: (value: string) => void;
  highlightPattern: RegExp;
  placeholder?: string;
  width?: string;
  highlightColor?: string;
}

const InputWrapper = styled.div<{ width: string }>`
  display: inline-block;
  position: relative;
  width: ${(props) => props.width};
`;

const HiddenTextArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 2;
  resize: none;
  overflow: hidden;
`;

const HighlightedContent = styled.div`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  white-space: pre-wrap;
  word-break: break-word;

  &:empty:before {
    content: attr(data-placeholder);
    color: #aaa;
  }
`;

const RegexHighlightInput: React.FC<RegexHighlightInputProps> = ({
  onChange,
  highlightPattern,
  placeholder = "Enter text",
  width = "300px",
  highlightColor = "rgba(255, 165, 0, 0.3)",
}) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightedContentRef = useRef<HTMLDivElement>(null);

  const getHighlightedText = (text: string) => {
    return text.replace(
      highlightPattern,
      (match) =>
        `<span style="background-color: ${highlightColor}">${match}</span>`
    );
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    if (highlightedContentRef.current) {
      highlightedContentRef.current.innerHTML =
        getHighlightedText(value) || "&nbsp;";
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = `${highlightedContentRef.current?.offsetHeight}px`;
    }
  }, [value]);

  return (
    <InputWrapper width={width}>
      <HiddenTextArea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        placeholder={placeholder}
      />
      <HighlightedContent
        ref={highlightedContentRef}
        data-placeholder={placeholder}
      />
    </InputWrapper>
  );
};

export default RegexHighlightInput;
