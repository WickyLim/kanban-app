// src/components/ui/card.tsx
import * as React from "react";

const Card = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    />
  );
};

const CardHeader = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  );
};

const CardTitle = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
};

const CardDescription = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    />
  );
};

const CardContent = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div 
      className={`p-6 pt-0 ${className}`} 
      {...props} 
    />
  );
};

const CardFooter = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex items-center p-6 pt-0 ${className}`}
      {...props}
    />
  );
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
