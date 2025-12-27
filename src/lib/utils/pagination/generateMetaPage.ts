import type { PageOptionsDto } from './page-options.dto';
import { PageDto } from './page.dto';

export const generateMetaPage = <T>(
  result: T[],
  itemCount: number,
  options: PageOptionsDto,
): PageDto<T> => {
  return new PageDto<T>(result, {
    itemCount,
    hasNextPage: options.skip + options.take < itemCount,
    hasPreviousPage: options.skip > 0,
    page: Number(options.page),
    pageCount: Math.ceil(itemCount / options.take),
    take: Number(options.take),
  });
};
