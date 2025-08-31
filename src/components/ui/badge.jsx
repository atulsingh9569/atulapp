import React from 'react';

export function Badge({ className = "", ...props }) {
  return <span className={`inline-block px-2 py-1 text-sm border rounded ${className}`} {...props} />
}
export default Badge
