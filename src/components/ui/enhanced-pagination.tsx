import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  loading?: boolean;
  showItemsPerPage?: boolean;
  showTotalItems?: boolean;
  infiniteScroll?: boolean;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
}

export function EnhancedPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  loading = false,
  showItemsPerPage = true,
  showTotalItems = true,
  infiniteScroll = false,
  onLoadMore,
  hasNextPage = false,
}: PaginationProps) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Infinite scroll logic
  useEffect(() => {
    if (!infiniteScroll || !onLoadMore) return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 1000 &&
        hasNextPage &&
        !isLoadingMore
      ) {
        setIsLoadingMore(true);
        onLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [infiniteScroll, onLoadMore, hasNextPage, isLoadingMore]);

  // Reset loading state when new data arrives
  useEffect(() => {
    setIsLoadingMore(false);
  }, [totalItems]);

  const getVisiblePages = useCallback(() => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  }, [currentPage, totalPages]);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (infiniteScroll) {
    return (
      <div className="flex flex-col items-center space-y-4">
        {showTotalItems && (
          <div className="text-sm text-muted-foreground">
            Showing {totalItems.toLocaleString()} results
          </div>
        )}
        {isLoadingMore && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <LoaderIcon className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading more results...</span>
          </div>
        )}
        {!hasNextPage && totalItems > 0 && (
          <div className="text-sm text-muted-foreground">
            You've reached the end of the results
          </div>
        )}
      </div>
    );
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-4">
        {showTotalItems && (
          <div className="text-sm text-muted-foreground">
            Showing {startItem.toLocaleString()} to {endItem.toLocaleString()}{" "}
            of {totalItems.toLocaleString()} results
          </div>
        )}

        {showItemsPerPage && onItemsPerPageChange && (
          <div className="flex items-center space-x-2">
            <span className="text-sm">Show:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => onItemsPerPageChange(parseInt(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {/* First page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || loading}
        >
          <ChevronsLeftIcon className="h-4 w-4" />
        </Button>

        {/* Previous page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {getVisiblePages().map((page, index) => (
            <Button
              key={index}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={typeof page !== "number" || loading}
              className="min-w-[36px]"
            >
              {loading && page === currentPage ? (
                <LoaderIcon className="h-4 w-4 animate-spin" />
              ) : (
                page
              )}
            </Button>
          ))}
        </div>

        {/* Next page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>

        {/* Last page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || loading}
        >
          <ChevronsRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Simple pagination for smaller components
export function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}: Pick<
  PaginationProps,
  "currentPage" | "totalPages" | "onPageChange" | "loading"
>) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
      >
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
      >
        Next
      </Button>
    </div>
  );
}
