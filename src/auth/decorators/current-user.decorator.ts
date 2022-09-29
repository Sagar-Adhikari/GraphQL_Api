import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserEntity } from "../../user/entity/user.entity";

export const getCurrentUserByContext = (context: ExecutionContext): UserEntity => {
    if (context.getType() === 'http') {
        return context.switchToHttp().getRequest().user;
    }
    if ((context.getType() as any) === 'graphql') {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().user;
    }
};

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        getCurrentUserByContext(context),
);
