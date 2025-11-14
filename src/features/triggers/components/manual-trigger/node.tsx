import { BaseTriggerNode } from "@/features/triggers/components/base-triggers-node";
import { ManualTriggerDialog } from "@/features/triggers/components/manual-trigger/dialog";
import { NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";
import { memo, useState } from "react";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = 'success';
  const handleOpenSettings = () => setDialogOpen(true);
	return (
        <>
          <ManualTriggerDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen}
          />
          <BaseTriggerNode
            {...props}
            icon={MousePointerIcon}
            name="手动触发"
            status={nodeStatus}
            onSettings={handleOpenSettings}
            onDoubleClick={handleOpenSettings}
          />
        </>
    )
})