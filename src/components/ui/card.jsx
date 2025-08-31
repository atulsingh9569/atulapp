import React from 'react';

export function Card({ className = "", ...props }) {
  return <div className={`border rounded p-3 ${className}`} {...props} />
}
export function CardContent({ className = "", ...props }) {
  return <div className={className} {...props} />
}
export function CardHeader({ className = "", children, ...props }) {
  return <div className={`px-2 pb-2 ${className}`} {...props}>{children}</div>
}
export function CardTitle({ className = "", children, ...props }) {
  return <h3 className={`text-base font-semibold ${className}`} {...props}>{children}</h3>
}
export default Card
