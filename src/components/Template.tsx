import { type Template } from "@/config/template";
import React from "react";

// S A M P L E
interface TemplateProps {
  template: Template
}
const Template: React.FC<TemplateProps> = ({ template }) => {
  return (
    <div>
      <h1>{template.title}</h1>
    </div>
  );
}

export default Template;
