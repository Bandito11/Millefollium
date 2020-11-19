/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { IRecipe } from "./interfaces";
export namespace Components {
    interface AppEdit {
    }
    interface AppEntryForm {
        "recipe": IRecipe;
    }
    interface AppHome {
    }
    interface AppMain {
    }
    interface AppRoot {
    }
}
declare global {
    interface HTMLAppEditElement extends Components.AppEdit, HTMLStencilElement {
    }
    var HTMLAppEditElement: {
        prototype: HTMLAppEditElement;
        new (): HTMLAppEditElement;
    };
    interface HTMLAppEntryFormElement extends Components.AppEntryForm, HTMLStencilElement {
    }
    var HTMLAppEntryFormElement: {
        prototype: HTMLAppEntryFormElement;
        new (): HTMLAppEntryFormElement;
    };
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppMainElement extends Components.AppMain, HTMLStencilElement {
    }
    var HTMLAppMainElement: {
        prototype: HTMLAppMainElement;
        new (): HTMLAppMainElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLElementTagNameMap {
        "app-edit": HTMLAppEditElement;
        "app-entry-form": HTMLAppEntryFormElement;
        "app-home": HTMLAppHomeElement;
        "app-main": HTMLAppMainElement;
        "app-root": HTMLAppRootElement;
    }
}
declare namespace LocalJSX {
    interface AppEdit {
    }
    interface AppEntryForm {
        "recipe"?: IRecipe;
    }
    interface AppHome {
    }
    interface AppMain {
    }
    interface AppRoot {
    }
    interface IntrinsicElements {
        "app-edit": AppEdit;
        "app-entry-form": AppEntryForm;
        "app-home": AppHome;
        "app-main": AppMain;
        "app-root": AppRoot;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-edit": LocalJSX.AppEdit & JSXBase.HTMLAttributes<HTMLAppEditElement>;
            "app-entry-form": LocalJSX.AppEntryForm & JSXBase.HTMLAttributes<HTMLAppEntryFormElement>;
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-main": LocalJSX.AppMain & JSXBase.HTMLAttributes<HTMLAppMainElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
        }
    }
}