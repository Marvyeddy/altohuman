import { ReactNode } from "react";

const textStyles = {
  size: {
    xl: "text-[32px] 2xl:text-[56px] leading-[106%] 2xl:leading-none tracking-[-2%]",
    lg: "text-[20px] 2xl:text-[40px] leading-none tracking-normal",
    md: "text-[16px] 2xl:text-[24px] leading-none",
    "base-pro": "text-[20px] leading-[150%] tracking-[-3%]",
    base: "text-[14px] 2xl:text-[16px]",
    sm: "text-sm",
    xs: "text-xs",
  },
  weight: {
    extrabold: "font-extrabold",
    light: "font-light",
  },
  color: {
    white: "text-white",
    black: "text-black",
    "custom-1": "text-custom-1",
    "custom-2": "text-custom-2",
  },
} as const;

type HeaderStyles = typeof textStyles;
type HeaderProps = {
  [k in keyof HeaderStyles]?: keyof HeaderStyles[k];
} & {
  className?: string;
  children: ReactNode;
};

function H1({
  children,
  className,
  color = "black",
  size = "xl",
  weight = "extrabold",
}: HeaderProps) {
  return (
    <h1
      className={`${textStyles.color[color]} ${textStyles.size[size]} ${textStyles.weight[weight]} ${className}`}
    >
      {children}
    </h1>
  );
}

function H2({
  children,
  className,
  color = "black",
  size = "lg",
  weight = "extrabold",
}: HeaderProps) {
  return (
    <h2
      className={`${textStyles.color[color]} ${textStyles.size[size]} ${textStyles.weight[weight]} ${className}`}
    >
      {children}
    </h2>
  );
}

function H3({
  children,
  className,
  color = "black",
  size = "md",
  weight = "extrabold",
}: HeaderProps) {
  return (
    <h3
      className={`${textStyles.color[color]} ${textStyles.size[size]} ${textStyles.weight[weight]} ${className}`}
    >
      {children}
    </h3>
  );
}

function H4({
  children,
  className,
  color = "black",
  size = "base-pro",
  weight = "extrabold",
}: HeaderProps) {
  return (
    <h4
      className={`${textStyles.color[color]} ${textStyles.size[size]} ${textStyles.weight[weight]} ${className}`}
    >
      {children}
    </h4>
  );
}

function P({
  children,
  className,
  color = "black",
  size = "base",
  weight = "light",
}: HeaderProps) {
  return (
    <p
      className={`${textStyles.color[color]} ${textStyles.size[size]} ${textStyles.weight[weight]} ${className}`}
    >
      {children}
    </p>
  );
}

const Typography = { H1, H2, H3, H4, P };
export default Typography;
