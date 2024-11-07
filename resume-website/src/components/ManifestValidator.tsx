"use client";

import { useEffect } from "react";
import { validateManifest } from "@/lib/validateManifest";

export function ManifestValidator() {
  useEffect(() => {
    validateManifest().then((isValid) => {
      if (!isValid) {
        console.error("Web manifest validation failed");
      }
    });
  }, []);

  return null;
}
