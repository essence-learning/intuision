import * as React from "react";
import classNames from "classnames";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import {
  tabsContentPropDefs,
  tabsListPropDefs,
  tabsRootPropDefs,
} from "@radix-ui/themes/src/components/tabs.props.ts";
import { extractProps } from "@radix-ui/themes/src/helpers/extract-props.ts";
import { marginPropDefs } from "@radix-ui/themes/src/props/margin.props.ts";

import type { MarginProps } from "@radix-ui/themes/src/props/margin.props.ts";
import type {
  ComponentPropsWithout,
  RemovedProps,
} from "@radix-ui/themes/src/helpers/component-props.ts";
import type { GetPropDefTypes } from "@radix-ui/themes/src/props/prop-def.ts";

type TabsRootElement = React.ElementRef<typeof TabsPrimitive.Root>;
type TabsRootOwnProps = GetPropDefTypes<typeof tabsRootPropDefs>;
interface TabsRootProps
  extends ComponentPropsWithout<
      typeof TabsPrimitive.Root,
      "asChild" | "color" | "defaultChecked"
    >,
    MarginProps,
    TabsRootOwnProps {}
const TabsRoot = React.forwardRef<TabsRootElement, TabsRootProps>(
  (props, forwardedRef) => {
    const { className, ...rootProps } = extractProps(props, marginPropDefs);
    return (
      <TabsPrimitive.Root
        {...rootProps}
        ref={forwardedRef}
        className={classNames("rt-TabsRoot", className)}
      />
    );
  },
);
TabsRoot.displayName = "Tabs.Root";

type TabsListElement = React.ElementRef<typeof TabsPrimitive.List>;
type TabsListOwnProps = GetPropDefTypes<typeof tabsListPropDefs>;
interface TabsListProps
  extends ComponentPropsWithout<typeof TabsPrimitive.List, RemovedProps>,
    MarginProps,
    TabsListOwnProps {}
const TabsList = React.forwardRef<TabsListElement, TabsListProps>(
  (props, forwardedRef) => {
    const { className, color, ...listProps } = extractProps(
      props,
      tabsListPropDefs,
      marginPropDefs,
    );
    return (
      <TabsPrimitive.List
        data-accent-color={color}
        {...listProps}
        asChild={false}
        ref={forwardedRef}
        className={classNames("rt-BaseTabList", "rt-TabsList", className)}
      />
    );
  },
);
TabsList.displayName = "Tabs.List";

type TabsTriggerElement = React.ElementRef<typeof TabsPrimitive.Trigger>;
interface TabsTriggerProps
  extends ComponentPropsWithout<typeof TabsPrimitive.Trigger, RemovedProps> {}
const TabsTrigger = React.forwardRef<TabsTriggerElement, TabsTriggerProps>(
  (props, forwardedRef) => {
    const { className, children, ...triggerProps } = props;
    return (
      <TabsPrimitive.Trigger
        {...triggerProps}
        asChild={false}
        ref={forwardedRef}
        className={classNames(
          "rt-reset",
          "rt-BaseTabListTrigger",
          "rt-TabsTrigger",
          className,
        )}
      >
        <span className="rt-BaseTabListTriggerInner rt-TabsTriggerInner">
          {children}
        </span>
        <span className="rt-BaseTabListTriggerInnerHidden rt-TabsTriggerInnerHidden">
          {children}
        </span>
      </TabsPrimitive.Trigger>
    );
  },
);
TabsTrigger.displayName = "Tabs.Trigger";

type TabsContentElement = React.ElementRef<typeof TabsPrimitive.Content>;
type TabsContentOwnProps = GetPropDefTypes<typeof tabsContentPropDefs>;
interface TabsContentProps
  extends ComponentPropsWithout<typeof TabsPrimitive.Content, RemovedProps>,
    MarginProps,
    TabsContentOwnProps {}
const TabsContent = React.forwardRef<TabsContentElement, TabsContentProps>(
  (props, forwardedRef) => {
    const { className, ...contentProps } = extractProps(props, marginPropDefs);
    return (
      <TabsPrimitive.Content
        {...contentProps}
        ref={forwardedRef}
        className={classNames("rt-TabsContent", className)}
      />
    );
  },
);
TabsContent.displayName = "Tabs.Content";

export {
  TabsRoot as Root,
  TabsList as List,
  TabsTrigger as Trigger,
  TabsContent as Content,
};
export type {
  TabsRootProps as RootProps,
  TabsListProps as ListProps,
  TabsTriggerProps as TriggerProps,
  TabsContentProps as ContentProps,
};