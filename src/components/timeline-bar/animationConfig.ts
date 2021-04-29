import type { AnimeParams } from 'animejs';

export const DURATION = 1000;
export interface IData {
  x: number;
  event: string;
  fill: string;
}

export enum Status {
  pre_start,
  start,
  drafted,
  done,
  post_done,
}

export enum ElementAppearance {
  hide,
  fade,
  show,
}
export interface IChartApperance {
  firstPin: ElementAppearance;
  draftPhase: ElementAppearance;
  donePhase: ElementAppearance;
  lastPin: ElementAppearance;
}

export interface ChartApperanceProps {
  from: IChartApperance;
  to: IChartApperance;
}

export const ChartAppearance: Record<Status, IChartApperance> = {
  [Status.pre_start]: {
    firstPin: ElementAppearance.hide,
    draftPhase: ElementAppearance.hide,
    donePhase: ElementAppearance.hide,
    lastPin: ElementAppearance.hide,
  },
  [Status.start]: {
    firstPin: ElementAppearance.show,
    draftPhase: ElementAppearance.hide,
    donePhase: ElementAppearance.hide,
    lastPin: ElementAppearance.hide,
  },
  [Status.drafted]: {
    firstPin: ElementAppearance.fade,
    draftPhase: ElementAppearance.show,
    donePhase: ElementAppearance.hide,
    lastPin: ElementAppearance.hide,
  },
  [Status.done]: {
    firstPin: ElementAppearance.fade,
    draftPhase: ElementAppearance.fade,
    donePhase: ElementAppearance.show,
    lastPin: ElementAppearance.show,
  },
  [Status.post_done]: {
    firstPin: ElementAppearance.show,
    draftPhase: ElementAppearance.show,
    donePhase: ElementAppearance.show,
    lastPin: ElementAppearance.show,
  },
};

export type TAnimationConfig = Record<ElementAppearance, Partial<AnimeParams>>;

export interface ApperanceProps {
  from: ElementAppearance;
  to: ElementAppearance;
}
