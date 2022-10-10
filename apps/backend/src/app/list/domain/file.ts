import { AggregateRoot } from '@app/core/domain/AggregateRoot';
import { UniqueEntityID } from '@app/core/domain/UniqueEntityID';
import { Optional } from '@app/core/types';
import { WasderException, WasderError } from '@app/server-errors';
import { Level, LevelUpdateProps } from './level';
import { BlockingTask } from './blocking-task';
import { SeasonGame } from './season-game';
import { SeasonAggregateUpdatedEvent } from './events/impl';
import { Reward, RewardUpdateProps } from './reward';
import { Tier } from './tier';

interface ListProps {
  displayName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ListCreateProps = Optional<ListProps, 'createdAt' | 'updatedAt'>;

export class List extends AggregateRoot<ListProps> {
  public static create(props: ListCreateProps, id?: UniqueEntityID): List {
    const now = new Date();
    const list = new List({
      ...props,
      levels: Level.sort(props.levels),
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    }, id);

    return list;
  }

  private constructor(props: ListProps, id?: UniqueEntityID) {
    super(props, id);
  }

  private markUpdated(): this {
    this.props.updatedAt = new Date();
    this.apply(new SeasonAggregateUpdatedEvent(this));
    return this;
  }

  private validateIfSeasonHasFinished() {
    if (this.isSeasonAlreadyFinished()) {
      throw new WasderException({
        error: WasderError.Season.SeasonAlreadyFinished,
        message: 'Cannot update an already finished season',
      });
    }
  }

  private validateDateProps(startDate: Date = this.startDate, endDate: Date = this.endDate) {
    if (startDate.valueOf() >= endDate.valueOf()) {
      throw new WasderException({
        error: WasderError.Season.InvalidStartDate,
        message: 'The start date cannot be after the end date',
      });
    }
  }

  public update(props: SeasonUpdateProps): this {
    this.validateIfSeasonHasFinished();
    if (this.isSeasonRunning() && (props.endDate || props.maxDailyXP || props.startDate)) {
      throw new WasderException({
        error: WasderError.Season.SeasonAlreadyStarted,
        message: 'The season has already started, only title, welcome tile or welcome description can be changed',
      });
    }

    this.validateDateProps(props.startDate, props.endDate);

    this.props.title = props.title ?? this.props.title;
    this.props.welcomeTitle = props.welcomeTitle ?? this.props.welcomeTitle;
    this.props.welcomeDescription = props.welcomeDescription ?? this.props.welcomeDescription;
    this.props.maxDailyXP = props.maxDailyXP ?? this.props.maxDailyXP;
    this.props.startDate = props.startDate ?? this.props.startDate;
    this.props.endDate = props.endDate ?? this.props.endDate;

    return this.markUpdated();
  }

  public addLevel(level: Level): this {
    this.validateIfSeasonHasFinished();
    if (this.isSeasonRunning()) {
      throw new WasderException({
        error: WasderError.Season.SeasonAlreadyStarted,
        message: 'The season has already started. No levels can be added',
      });
    }

    this.props.levels.push(level);
    Level.sort(this.props.levels);

    return this.markUpdated();
  }

  public addBlockingTaskToLevel(blockingTask: BlockingTask): this {
    this.validateIfSeasonHasFinished();

    const level = this.levels.find((l) => l.id.toString() === blockingTask.levelId.toString());
    if (!level) {
      throw new WasderException({
        error: WasderError.Common.NotFound,
        message: 'Level not found',
      });
    }

    level.setBlockedBy(blockingTask);

    return this.markUpdated();
  }

  public addTier(tier: Tier): this {
    this.props.leaderboard.tiers.push(tier);
    Tier.sort(this.props.leaderboard.tiers);

    return this.markUpdated();
  }

  public updateLevel(levelId: string, props: LevelUpdateProps): Level {
    this.validateIfSeasonHasFinished();

    const level = this.levels.find((current) => current.id.toString() === levelId);
    if (!level) {
      throw new WasderException({
        error: WasderError.Common.NotFound,
        message: 'Level not found',
      });
    }

    const updatedLevel = level.update(props);
    this.markUpdated();

    return updatedLevel;
  }

  public updateReward(rewardId: string, props: RewardUpdateProps): Reward {
    this.validateIfSeasonHasFinished();

    const reward = this.levels.map((level) => level.reward).find((current) => current.id.toString() === rewardId);
    if (!reward) {
      throw new WasderException({
        error: WasderError.Common.NotFound,
        message: 'Reward not found',
      });
    }

    const updatedReward = reward.update(props);

    this.markUpdated();

    return updatedReward;
  }

  get title(): string {
    return this.props.title;
  }

  get welcomeTitle(): string {
    return this.props.welcomeTitle;
  }

  get welcomeDescription(): string {
    return this.props.welcomeDescription;
  }

  get maxDailyXP(): number | undefined {
    return this.props.maxDailyXP;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get endDate(): Date {
    return this.props.endDate;
  }

  get levels(): Level[] {
    return this.props.levels;
  }

  get blockingTasks(): BlockingTask[] {
    return this.levels.filter((level) => level.blockedBy !== null).map((level) => level.blockedBy);
  }

  get games(): SeasonGame[] {
    return this.props.games;
  }

  get leaderboard(): Leaderboard {
    return this.props.leaderboard;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public isSeasonAlreadyFinished() {
    return this.endDate.valueOf() < Date.now();
  }

  public isSeasonRunning() {
    const now = Date.now();
    return now >= this.startDate.valueOf() && now <= this.endDate.valueOf();
  }
}
