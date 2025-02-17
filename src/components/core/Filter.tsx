import { Button } from '../ui/button';
import { FilterIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const FILTER_OPTIONS = [
  { label: 'All Tasks', value: -1 },
  { label: 'Completed Tasks', value: 2 },
  { label: 'Over Due Tasks', value: 3 },
  { label: 'Upcoming Tasks', value: 1 },
];

const SORT_OPTIONS = [
  { label: 'Due Date Low To High', value: 1, type: 'due' },
  { label: 'Due Date High To Low', value: -1, type: 'due' },
  { label: '', value: -1, type: '' },
  { label: 'Priority Low To High', value: 1, type: 'priority' },
  { label: 'Priority High To Low', value: -1, type: 'priority' },
];

const Filter = ({
  seeoption,
  setseeoption,
  sortbydue,
  setsortbydue,
  sortbypriority,
  setsortbypriority,
}: {
  seeoption: number;
  setseeoption: (value: number) => void;
  sortbydue: number;
  setsortbydue: (value: number) => void;
  sortbypriority: number;
  setsortbypriority: (value: number) => void;
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>
            <FilterIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className='flex justify-between items-center'>
            <p>Task Type</p>
            <Button onClick={() => setseeoption(-1)} className='p-2'>
              Clear
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {FILTER_OPTIONS.map(({ label, value }) => (
            <DropdownMenuItem
              key={value}
              onClick={() => setseeoption(value)}
              className={seeoption === value ? 'bg-blue-700 cursor-pointer' : 'cursor-pointer'}
            >
              {label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className='flex justify-between items-center'>
            <p>Sort Type</p>
            <Button
              onClick={() => {
                setsortbydue(0);
                setsortbypriority(0);
              }}
              className='p-2'
            >
              Clear
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {SORT_OPTIONS.map(({ label, value, type }) => {
            if(label=='') return <div className=' h-3 w-full'></div>
            return (
            <DropdownMenuItem
              key={label}
              onClick={() => (type === 'due' ? setsortbydue(value) : setsortbypriority(value))}
              className={
                (type === 'due' && sortbydue === value) || (type === 'priority' && sortbypriority === value)
                  ? 'bg-blue-700 cursor-pointer'
                  : 'cursor-pointer'
              }
            >
              {label}
            </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Filter;