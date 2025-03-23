"use client";

import { MDXRemote } from "next-mdx-remote";
import React from "react";
import type { Source } from "@/types/post";
import type { MDXComponents } from "mdx/types";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

interface MDXRendererProps {
  source: Source;
  components?: MDXComponents;
}

export default function MDXRenderer({ source, components }: MDXRendererProps) {
  const defaultComponents: MDXComponents = {
    h1: ({
      children,
      ...props
    }: DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >) => (
      <h1
        {...props}
        id={
          typeof children === "string"
            ? children.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")
            : ""
        }
      >
        {children}
      </h1>
    ),
    h2: ({
      children,
      ...props
    }: DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >) => (
      <h2
        {...props}
        id={
          typeof children === "string"
            ? children.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")
            : ""
        }
      >
        {children}
      </h2>
    ),
    h3: ({
      children,
      ...props
    }: DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >) => (
      <h3
        {...props}
        id={
          typeof children === "string"
            ? children.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")
            : ""
        }
      >
        {children}
      </h3>
    ),
    ...components,
  };

  return <MDXRemote {...source} components={defaultComponents} />;
}
