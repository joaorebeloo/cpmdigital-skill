export type MotionLevel = "none" | "minimal" | "moderate" | "heavy";

export type CliOptions = {
  command: "analyze";
  url: string;
  outDir: string;
  motion: MotionLevel;
  maxElements: number;
};

export type ElementSnapshot = {
  tag: string;
  id: string | null;
  className: string | null;
  textContent: string | null;
  boundingBox: { x: number; y: number; width: number; height: number } | null;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  color: string;
  backgroundColor: string;
  borderRadius: string;
  padding: string;
  margin: string;
  display: string;
  position: string;
  boxShadow: string;
  opacity: string;
  transform: string;
  transitionProperty: string;
  transitionDuration: string;
  transitionTimingFunction: string;
  transitionDelay: string;
  animationName: string;
  animationDuration: string;
  animationTimingFunction: string;
  animationDelay: string;
  animationIterationCount: string;
};

export type MotionRaw = {
  computedMotion: ElementSnapshot[];
  keyframes: { name: string; cssText: string }[];
  interactionRules: { selector: string; cssText: string }[];
};

export type Tokens = {
  sourceUrl: string;
  generatedAt: string;
  counts: { elements: number; keyframes: number; interactionRules: number };
  colors: string[];
  backgroundColors: string[];
  fontFamilies: string[];
  fontSizes: string[];
  fontWeights: string[];
  borderRadii: string[];
  shadows: string[];
  motion: {
    requestedLevel: MotionLevel;
    inferredLevel: MotionLevel;
    durations: string[];
    easings: string[];
    delays: string[];
    animationNames: string[];
    shouldUseFramerMotion: "yes" | "no" | "conditional";
  };
};
