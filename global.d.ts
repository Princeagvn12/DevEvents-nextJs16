// Type declarations for CSS imports
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Type declarations for CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
