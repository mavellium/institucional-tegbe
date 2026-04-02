"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { sanitizeFormHtml } from "@/core/security";

export default function EmpresasModal({ open, onClose, html }: any) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-lg w-full relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4">
              <Icon icon="solar:close-circle-linear" />
            </button>

            {html ? (
              <div dangerouslySetInnerHTML={{ __html: sanitizeFormHtml(html) }} />
            ) : (
              <p>Formulário indisponível</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,

    document.body
  );
}
