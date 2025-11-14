import { useWorkflowsParams } from "@/features/workflows/hooks/use-workflows-params";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowsParams();
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params))
}

/**
 * 钩子来创建一个工作流
 * 
 */

export const useCreateWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`工作流"${data.name}"创建成功`);
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions({}),
            );
        },
        onError: (error) => {
            toast.error(`创建工作流失败: ${error.message}`)
        }
    }))
}

/**
 * 钩子来删除一个工作流
 * 
 */

export const useRemoveWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(trpc.workflows.remove.mutationOptions({
        onSuccess: (data) => {
            toast.success(`工作流${data.name}删除成功`);
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions({}),
            );
            queryClient.invalidateQueries(
                trpc.workflows.getOne.queryFilter({ id: data.id }),
            )
        },
        onError: (error) => {
            toast.error(`删除工作流失败: ${error.message}`)
        }
    }))
}

/**
 * 钩子来获取一个工作流
 * 
 */

export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }))
}


/**
 * 钩子来更新一个工作流名称
 * 
 */

export const useUpdateWorkflowName = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(trpc.workflows.updataName.mutationOptions({
        onSuccess: (data) => {
            toast.success(`工作流"${data.name}"更新成功`);
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions({}),
            );
            queryClient.invalidateQueries(
                trpc.workflows.getOne.queryOptions({ id: data.id }),
            )
        },
        onError: (error) => {
            toast.error(`更新工作流失败: ${error.message}`)
        }
    }))
}

/**
 * 钩子来更新一个工作流
 * 
 */
export const useUpdateWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(trpc.workflows.updata.mutationOptions({
        onSuccess: (data) => {
            toast.success(`工作流"${data.name}"保存成功`);
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions({}),
            );
            queryClient.invalidateQueries(
                trpc.workflows.getOne.queryOptions({ id: data.id }),
            )
        },
        onError: (error) => {
            toast.error(`保存工作流失败: ${error.message}`)
        }
    }))
}