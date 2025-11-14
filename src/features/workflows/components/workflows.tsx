"use client"

import { formatDistanceToNow } from "date-fns";
import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "@/features/workflows/hooks/use-workflows"
import { useWorkflowsParams } from "@/features/workflows/hooks/use-workflows-params";
import { Workflow } from "@/generated/prisma/client";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkflowsSearch = () => {
    const [ params, setParams ] = useWorkflowsParams();
    const { searchValue, onSearchChange } = useEntitySearch({
        params,
        setParams,
    })
    return(
        <EntitySearch
          value={searchValue}
          onChange={onSearchChange}
          placeholder="搜索工作流"
        />
    )
}


export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();

    return(
        <EntityList
          items={workflows.data.items}
          getKey={(workflow) => workflow.id}
          renderItem={(workflow) => <WorkflowItem data={workflow} />}
          emptyView={<WorkflowsEmpty />}
        />
    )
}

export const WorkflowsHeader = ({disabled}:{disabled?:boolean}) => {
    const router = useRouter();
    const createworkflow = useCreateWorkflow();
    const { handleError,modal } = useUpgradeModal();
    
    const headleCreate = () => {
        createworkflow.mutate(undefined,{
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) => {
                handleError(error) 
            }
        });
    }
    return(
        <>
          {modal}
          <EntityHeader
            title="工作流"
            description="创建和管理您的工作流"
            onNew={headleCreate}
            newButtonLabel="创建工作流"
            disabled={disabled}
            isCreating={createworkflow.isPending}
            />
        </>
    )
}

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows();
    const [params, setParams] = useWorkflowsParams();

    return(
        <EntityPagination
           disabled={workflows.isFetching}
           totalPages={workflows.data?.totalPages}
           page={workflows.data.page}
           onPageChange={(page) => setParams({ ...params,page })}
        />
    )
    
}


export const WorkflowsContainer = ({
    children,
}: {
    children:React.ReactNode;
}) => {
    return(
        <EntityContainer
          header={<WorkflowsHeader/>}
          search={<WorkflowsSearch/>}
          pagination={<WorkflowsPagination/>}
        >
            {children}
        </EntityContainer>
    )
}

export const WorkflowsLoading = () => {
    return<LoadingView message="正在加载工作流" /> 
}

export const WorkflowsError = () => {
    return<ErrorView message="错误加载工作流" /> 
}

export const WorkflowsEmpty = () => {
    const router = useRouter();
    const createworkflow = useCreateWorkflow();
    const { handleError,modal } = useUpgradeModal();
    
    const handleCreate = () => {
        createworkflow.mutate(undefined,{
            onError: (error) => {
                handleError(error) 
            },
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            }
        })
    }


    return <>
    {modal}
        <EmptyView
        onNew={handleCreate}
        message="您还没有创建任何工作流。 开始创建您的第一个工作流."
        />
    </>
}

export const WorkflowItem = ({
    data,
}:{
    data:Workflow
}) => {
    const removeWorkflow = useRemoveWorkflow();  
    const handleRemove = () => {
        removeWorkflow.mutate({id : data.id})
    }

    return(
        <EntityItem
        href={`/workflows/${data.id}`}
        title={data.name}
        subtitle={
            <>
               Updated {formatDistanceToNow(data.updatedAt,{addSuffix:true})} {" "}
               &bulll; Created {" "}
               {formatDistanceToNow(data.createdAt,{addSuffix:true})}
            </>
        }
        image={
            <div className="size-8 flex items-center justify-center">
                <WorkflowIcon className="size-5 text-muted-foreground"/>
            </div>
        }
        onRemove={handleRemove}
        isRemoving={removeWorkflow.isPending}
        />
    )
}