import React from "react";
import "./Pagination.scss";
import { withTranslation } from 'react-i18next';

const defaultButton = (props: any) => (
  <button {...props}>{props.children}</button>
);

export interface IProps {
  pages: Number;
  page: Number;
  PageButtonComponent: any;
  onPageChange: () => void;
  defaultPageSize: number;
  data: Array<Object>;
  pageSize: number;
  customPageSize: (num: number) => void;
  totalRecords: number;
  initialPageSize: number;
  onPaginationChange: (page: number, pageSize?: number) => void;
  changePage: (page: number) => void;
  activePage: number;
  module?: string;
}

class Pagination extends React.Component<IProps> {
  paging: Array<number>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      visiblePages: this.getVisiblePages(null, props.pages),
    };
    this.paging = [];
    this.changePaging();
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.pages !== nextProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(null, nextProps.pages),
      });
    }
    this.changePaging();
  }

  filterPages = (visiblePages: any, totalPages: any) => {
    return visiblePages.filter((page: any) => page <= totalPages);
  };

  getVisiblePages = (page: any, total: any) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  changePaging = () => {
    let count = 0;
    this.paging = [];
    let len = this.props.totalRecords / this.props.initialPageSize;
    len % 1 === 0 ? (len = len - 1) : (len = Math.ceil(len));
    len > 0 &&
      [...Array(len + 1)].forEach(() => {
        if (count <= this.props.totalRecords) {
          count === 0 ? (count = this.props.initialPageSize) : (count += count);
          this.paging.push(count);
        }
        return null;
      });
  };

  render() {
    const {
      PageButtonComponent = defaultButton,
      pageSize,
      activePage,
      t
    } = this.props;
    const { visiblePages }: any = this.state;
    return (
      this.props.totalRecords > 0 && (
        <div className="Table__pagination__Wrapper flexSb p-2">
          <div className="Table__pagination flexew isFlex">
            <div className="Table__prevPageWrapper">
              <PageButtonComponent
                className="Table__pageButton btn-link"
                onClick={() => {
                  if (activePage === 1) return;
                  this.props.onPaginationChange(activePage - 1);
                  this.props.changePage(activePage - 1);
                }}
                disabled={activePage === 1}
              >
                {t("previous")}
              </PageButtonComponent>
            </div>
            <div className="Table__visiblePagesWrapper">
              {visiblePages.map((page: any, index: any, array: any) => {
                return (
                  !isNaN(page) && (
                    <PageButtonComponent
                      key={page}
                      className={
                        activePage === page
                          ? "Table__pageButton btn-link Table__pageButton--active"
                          : "Table__pageButton btn-link"
                      }
                      onClick={() => {
                        if (activePage === page) return;
                        this.props.onPaginationChange(page);
                        this.props.changePage(page);
                      }}
                    >
                      {array[index - 1] + 2 < page ? `...${page}` : page}
                    </PageButtonComponent>
                  )
                );
              })}
            </div>
            <div className="Table__nextPageWrapper">
              <PageButtonComponent
                className="Table__pageButton btn-link"
                onClick={() => {
                  if (activePage === this.props.pages) return;
                  this.props.onPaginationChange(activePage + 1);
                  this.props.changePage(activePage + 1);
                }}
                disabled={activePage === this.props.pages}
              >
                {t("next")}
              </PageButtonComponent>
            </div>
          </div>
          {this.paging.length > 1 && (
            <div className="Table__pagination flexew text-right">
              <span className="label">{t("showing")}</span>{" "}
              {this.paging.map((num, index) => {
                return (
                  <PageButtonComponent
                    key={index + 1}
                    className={
                      num === pageSize ||
                      (num > pageSize && Math.ceil(num % pageSize) !== 0)
                        ? "Table__pageButton btn-link Table__pageButton--active"
                        : "Table__pageButton btn-link"
                    }
                    onClick={() => {
                      if (
                        num === pageSize ||
                        (num > pageSize && Math.ceil(num % pageSize) !== 0)
                      )
                        return;
                      this.props.customPageSize(num);
                      setTimeout(() => {
                        this.props.onPaginationChange(1, num);
                        this.props.changePage(1);
                      }, 0);
                    }}
                  >
                    {num}
                  </PageButtonComponent>
                );
              })}{" "}
              <span className="label">{this.props.module}</span>
            </div>
          )}
        </div>
      )
    );
  }
}

export default withTranslation()(Pagination);
