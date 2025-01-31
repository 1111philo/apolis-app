import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Table, Button, Modal } from "react-bootstrap";
import { ArrowUpDown as SortIcon } from "lucide-react";
import NewGuestForm from "../lib/components/NewGuestForm";
import FeedbackMessage from "../lib/components/FeedbackMessage";
import TableFilter from "../lib/components/TableFilter";
import TablePager from "../lib/components/TablePager";
import {
  addGuest,
  getGuestData,
  getGuests,
  getGuestsWithQuery,
} from "../lib/api/guest";
import { SORT_DIRECTION, sortRowsBy } from "../lib/utils";
import { useDebouncedCallback } from "use-debounce";

const ITEMS_PER_PAGE = 10;

interface LoaderData {
  // TODO: request a route for this page -- when i query guests, i need active_notification_count!!! -- maybe stick this into getGuests - otherwise, I'm making a request for each guest in the table just to get notification counts
  guests: Guest[];
  totalGuestCount: number;
  page: number;
  totalPages: number;
}

interface SearchParams {
  query?: string;
  page?: number;
}

export const Route = createFileRoute("/guests")({
  component: GuestsView,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const { query, page: _page } = search;
    const page = Number(_page ?? 1);
    if (!query) return { page };
    return {
      query: String(query || ""),
      page,
    };
  },
  loaderDeps: ({ search: { query, page } }) => {
    return { query, page };
  },
  loader: async ({ deps: { query, page } }): Promise<LoaderData> => {
    const guestsResponse = query
      ? await getGuestsWithQuery(query)
      : await getGuests(page ?? 1, ITEMS_PER_PAGE);
    /** Filtered and sorted. */
    const guests = await Promise.all(
      guestsResponse.rows.map((g) =>
        getGuestData(g.guest_id).then((guestResp) => {
          const { total, ...guest } = guestResp;
          return guest;
        })
      )
    );
    // TODO: fix api -- need total user count (key 'total' = 0, always)
    // BUG? NO! the page count remaining the same when a query returns 1 page of results is because we can't yet get total guest count from the api
    /** TODO: WHEN API WORKS -- remove `|| 48` below */
    const totalGuestCount = guestsResponse.total || 48;
    const totalPages = Math.ceil(totalGuestCount / ITEMS_PER_PAGE);
    return {
      guests,
      totalGuestCount,
      page: page!,
      totalPages,
    };
  },
});

function GuestsView() {
  let { guests, totalGuestCount, page, totalPages } = Route.useLoaderData();

  const [sortedGuests, setSortedGuests] = useState<Guest[]>(guests);
  useEffect(() => setSortedGuests(guests), [guests]);

  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const executeSearch = useDebouncedCallback(() => {
    if (!filterText) {
      navigate({ to: "/guests" });
      return;
    }
    navigate({ to: "/guests", search: { query: filterText } });
  }, 500);

  const [showNewGuestModal, setShowNewGuestModal] = useState(false);

  const [feedback, setFeedback] = useState<UserMessage>({
    text: "",
    isError: false,
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Guests</h1>
        <Button className="m-2" onClick={() => setShowNewGuestModal(true)}>
          New Guest
        </Button>
      </div>

      <FeedbackMessage
        text={feedback.text}
        isError={feedback.isError}
        className="my-3"
      />

      <Modal show={showNewGuestModal}>
        <NewGuestForm
          onSubmit={onSubmitNewGuestForm}
          onClose={onCloseNewGuestForm}
        />
      </Modal>

      <TableFilter
        label="Filter Guests by ID, Name, Birthday"
        placeholder="Filter guests..."
        filterText={filterText}
        onChange={onChangeFilter}
      />

      <GuestsTable rows={sortedGuests} setSortedRows={setSortedGuests} />
      <TablePager
        queryRoute="/guests"
        page={page}
        totalPages={totalPages}
        paginatedDataLength={sortedGuests.length}
        rowsCount={totalGuestCount}
      />
    </>
  );

  async function onChangeFilter(newVal) {
    setFilterText(newVal);
    executeSearch();
  }

  // TODO: require at least 2 fields!
  async function onSubmitNewGuestForm(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<number | null> {
    e.preventDefault();
    const guest: Partial<Guest> = Object.fromEntries(new FormData(e.target));
    const guest_id = await addGuest(guest);
    if (!guest_id) return null;
    setShowNewGuestModal(false);
    setFeedback({
      text: `Guest created successfully! ID: ${guest_id}`,
      isError: false,
    });
    const newGuest: Partial<Guest> = { ...guest, guest_id };
    setSortedGuests && setSortedGuests([newGuest as Guest, ...sortedGuests]);
    return guest_id;
  }

  function onCloseNewGuestForm() {
    if (!confirm("Discard the new guest?")) return;
    setShowNewGuestModal(false);
  }
}

// TODO: Once api supports sorting, use navigate() with search key
function GuestsTable({ rows /* setSortedRows */ }) {
  const navigate = useNavigate();
  return (
    <Table className="mb-4 text-center table-sm" style={{ cursor: "pointer" }}>
      <thead>
        <tr>
          <th /* title="Sort by guest ID" onClick={} */>
            ID {/* <SortIcon className="ms-2" size={16} /> */}
          </th>
          <th /* title="Sort by first name" onClick={} */>
            First {/* <SortIcon className="ms-2" size={16} /> */}
          </th>
          <th /* title="Sort by last name" onClick={} */>
            Last {/* <SortIcon className="ms-2" size={16} /> */}
          </th>
          <th /* title="Sort by birthday" onClick={} */>
            DOB {/* <SortIcon className="ms-2" size={16} /> */}
          </th>
          <th
            /* title="Sort by notification count" */
            className="overflow-hidden text-truncate"
          >
            Alerts {/* <SortIcon className="ms-2" size={16} /> */}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((g) => {
          const notificationCount = g.guest_notifications?.length ?? 0;
          return (
            <tr
              key={g.guest_id}
              className="cursor-pointer"
              onClick={() => navigate({ to: `/guests/${g.guest_id}` })}
            >
              <td>
                <span className="badge bg-primary rounded-pill">
                  {g.guest_id.toString().padStart(5, "0")}
                </span>
              </td>
              <td>{g.first_name}</td>
              <td>{g.last_name}</td>
              <td>{g.dob}</td>
              <td>
                <div className="fs-4" style={{ marginBlock: "-5px" }}>
                  {notificationCount > 0 ? "❗️" : ""}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
