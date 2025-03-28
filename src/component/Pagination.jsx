import { Pagination } from '@mui/material';

const PaginationComponent = ({ count, page, onChange }) => (
  <Pagination
    count={count}
    page={page + 1}
    onChange={onChange}
    color="primary"
  />
);
