import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"
import type { ReactNode } from "react"
import { contentVariants } from "../../../core/configs/motionPresets"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

type MotionDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    trigger?: ReactNode
    preset?: string
    title?: string
    description?: string
    children: ReactNode
}

export function MotionDialog({
    open,
    onOpenChange,
    trigger,
    title = "",
    description = "",
    preset = "scale",

    children,
}: MotionDialogProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        {/* Overlay */}
                        <Dialog.Overlay asChild>
                            <motion.div
                                className="fixed inset-0 bg-black/50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        </Dialog.Overlay>
                        {/* Accessibility requirements */}
                        <Dialog.Title asChild>
                            <VisuallyHidden>{title}</VisuallyHidden>
                        </Dialog.Title>

                        {description ? (
                            <Dialog.Description asChild>
                                <VisuallyHidden>{description}</VisuallyHidden>
                            </Dialog.Description>
                        ) : (
                            <Dialog.Content aria-describedby={undefined} />
                        )}

                        {/* Content */}
                        {/* 
                        onPointerDownOutside={(e) => e.preventDefault()}
                        onInteractOutside={(e) => e.preventDefault()} 
                            onEscapeKeyDown={(e) => e.preventDefault()}
                            */}
                        <Dialog.Content
                            asChild
                        >
                            <motion.div
                                className="fixed left-1/2 top-1/2 w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
                                variants={contentVariants[preset]}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.25, ease: "easeOut" }}
                            >
                                {children}
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    )
}
