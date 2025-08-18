import React from "react";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/Modal";

interface DeleteEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityType: "file" | "folder";
  entityName: string;
  additionalWarning?: string;
}

export const DeleteEntityModal: React.FC<DeleteEntityModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  entityType,
  entityName,
  additionalWarning,
}) => {
  const t = useTranslations('DeleteEntityModal');
  if (!isOpen) return null;

  return (
    <Modal
      onOutsideClick={onClose}
      width="max-w-md w-full"
      hideDividerForTitle
      noPadding
    >
      <>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{t("delete")} {entityType}</h2>
          <p className="mb-6 line-wrap break-words">
            {t("deleteWarning", { entityType, entityName })}
            {additionalWarning}
          </p>
          <div className="flex justify-end space-x-4">
            <Button onClick={onClose} variant="outline">
              {t("cancel")}
            </Button>
            <Button onClick={onConfirm} variant="destructive">
              {t("delete")}
            </Button>
          </div>
        </div>
      </>
    </Modal>
  );
};
