"use client"

import { useReactFlow, type Node,type NodeProps } from "@xyflow/react"
import { GlobeIcon } from "lucide-react"
import { memo, useState } from "react"
import { BaseExecutionNode } from "../base-execution-node"
import { FormType, HttpRequestDialog } from "@/features/executions/components/http-request/dialog"


type HttpQequestNodeData ={
    endpoint: string
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    body?: string
    [key:string]:unknown
}
type HttpQequestNodeType = Node<HttpQequestNodeData>

export const HttpRequestNode = memo((props: NodeProps<HttpQequestNodeType>) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setNodes } = useReactFlow()
    const nodeStatus = 'success';
    const handleOpenSettings = () => setDialogOpen(true);

    const handleSubmit = (values:FormType) => {
        setNodes((nodes)=>nodes.map((node)=>{
            if(node.id === props.id){
                return {
                    ...node,
                    data:{
                        ...node.data,
                        endpoint: values.endpoint,
                        method: values.method,
                        body: values.body
                    }
                }
            }
            return node
        }))
    }

    const nodeData = props.data;
    const description = nodeData.endpoint 
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "未设置"

    return (
        <>
        <HttpRequestDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultEndpoint={nodeData.endpoint}
        defaultMethod={nodeData.method}
        defaultBody={nodeData.body}
        />
        <BaseExecutionNode
          {...props}
          id={props.id}
          icon={GlobeIcon}
          name="HTTP请求"
          description={description}
          status={nodeStatus}
          onSettings={handleOpenSettings}
          onDoubleClick={handleOpenSettings}
        />
        </>
    )
})

HttpRequestNode.displayName = 'HttpRequestNode'