'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FilterDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value = 'all',
  onChange = () => {},
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-[300px] bg-white p-6'>
        <SelectValue placeholder='Filter by status' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All</SelectItem>
        <SelectItem value='complete'>Complete</SelectItem>
        <SelectItem value='incomplete'>Incomplete</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterDropdown;
