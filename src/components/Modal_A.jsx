import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Modal_A = () => {
  const [contacts, setContacts] = useState([]);
  const [isEven, setIsEven] = useState(false);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let url =
      search === ""
        ? ` https://contact.mediusware.com/api/contacts/?page=${page}&page_size=10`
        : `https://contact.mediusware.com/api/country-contacts/${country}?page=1&page_size=5`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setContacts(contacts.concat(data.results)))
      .catch(() => {
        setHasMore(false)
      })
  }, [country, page]);
  //   console.log(contacts)

  const handleEvenChanges = (e) => {
    setIsEven(e.target.checked);
  };

  let content = [];
  if (isEven) {
    content = contacts?.filter((c) => c.id % 2 === 0);
  } else {
    content = contacts;
  }

  const handleSearch = () => {
    setCountry(search);
  };

  const fetchData = () => {
    if ((content.length < 600)) {
      setPage(page + 1);
    }
    else{
      setHasMore(false)
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="TableModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header w-100">
              <div className="d-flex justify-content-between align-items-center w-100">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  All Contacts
                </h1>
                <div className="input-group w-75">
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    value={search}
                    className="form-control"
                    placeholder="Search by country name"
                    aria-label="Search by country name"
                    aria-describedby="button-addon2"
                  />
                  <button
                    onClick={handleSearch}
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">Country</th>
                  </tr>
                </thead>
                <tbody>
                  <InfiniteScroll
                    height={200}
                    dataLength={contacts?.length || 0}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                  >
                    {content?.map((c) => (
                      <tr key={c?.id}>
                        <td>
                          {c?.country?.name} {c?.phone}
                        </td>
                      </tr>
                    ))}
                  </InfiniteScroll>
                </tbody>
              </table>
            </div>
            <div className="modal-footer d-flex justify-content-between align-items-center">
              <div className="mb-3 form-check">
                <input
                  onChange={handleEvenChanges}
                  type="checkbox"
                  value={isEven}
                  className="form-check-input"
                  name="onlyEven"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Only even
                </label>
              </div>
              <div className="d-flex justify-content-center gap-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="btn btn-primary"
                  type="button"
                >
                  All Contacts
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#UsContactsModal"
                  className="btn btn-warning"
                  type="button"
                >
                  US Contacts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal_A;
