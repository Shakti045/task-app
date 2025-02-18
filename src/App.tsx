import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useState, useMemo, useCallback } from "react";
import { Task } from "./constants";
import CompletedTasks from "./components/core/CompletedTasks";
import UpcomingTasks from "./components/core/UpcomingTasks";
import OverDueTasks from "./components/core/OverDueTasks";
import TaskInput from "./components/core/TaskInput";
import Filter from "./components/core/Filter";
import { ModeToggle } from "./components/ui/mode-toggle";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import SearchBox from "./components/core/SearchBox";
import SearchedTasks from "./components/core/SearchedTasks";

const App = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const currentTime = Date.now();

  const categorizedTasks = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        if (task.completed) {
          acc.completed.push(task);
        } else if (task.duedate < currentTime) {
          acc.overdue.push(task);
        } else {
          acc.upcoming.push(task);
        }
        return acc;
      },
      { completed: [], upcoming: [], overdue: [] } as {
        completed: Task[];
        upcoming: Task[];
        overdue: Task[];
      }
    );
  }, [tasks, currentTime]);

  const [open, setOpen] = useState(false);
  const [seeOption, setSeeOption] = useState(-1);
  const [sortByDue, setSortByDue] = useState(0);
  const [sortByPriority, setSortByPriority] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const sortTasks = useCallback(
    (tasks: Task[]) => {
      let sortedTasks = [...tasks];

      if (sortByDue !== 0) {
        sortedTasks.sort((a, b) => 
          sortByDue === 1 ? a.duedate - b.duedate : b.duedate - a.duedate
        );
      }

      if (sortByPriority !== 0) {
        sortedTasks.sort((a, b) => 
          sortByPriority === 1 ? b.prioritylevel - a.prioritylevel : a.prioritylevel - b.prioritylevel
        );
      }

      return sortedTasks;
    },
    [sortByDue, sortByPriority]
  );


  const getSearchedTasks = useCallback(
    (searchValue: string) => {
      return tasks.filter((task) =>
        task.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    },
    [tasks]
  );

  const handleOpen = useCallback(() => setOpen(true), []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-4/5 h-4/5  rounded-md">
        <div className="flex items-center justify-between border-b-2 p-4 max-sm:flex-col max-sm:gap-2">
          <Button onClick={handleOpen}>
            Create Task <Plus />
          </Button>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            <Filter
              seeoption={seeOption}
              setseeoption={setSeeOption}
              sortbydue={sortByDue}
              setsortbydue={setSortByDue}
              sortbypriority={sortByPriority}
              setsortbypriority={setSortByPriority}
            />
          </div>
        </div>
        {tasks.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center">
            <p className="text-center">Start Creating Your Tasks</p>
          </div>
        ) : (
          <>
            {
              searchValue.trim().length > 0 ? (<SearchedTasks tasks={sortTasks(getSearchedTasks(searchValue))}/>):(
                <>
                {(seeOption === -1 || seeOption === 1) && (
                  <UpcomingTasks tasks={sortTasks(categorizedTasks.upcoming)} />
                )}
                {(seeOption === -1 || seeOption === 2) && (
                  <CompletedTasks tasks={sortTasks(categorizedTasks.completed)} />
                )}
                {(seeOption === -1 || seeOption === 3) && (
                  <OverDueTasks tasks={sortTasks(categorizedTasks.overdue)} />
                )}
                </>
              )
            }
          </>
        )}
      </div>
      {open && <TaskInput open={open} setopen={setOpen} />}
    </div>
  );
};

export default App;
