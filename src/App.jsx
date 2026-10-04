import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MoveCard from './components/MoveCard/MoveCard';
import LoadingState from './components/LoadingState/LoadingState';
import ErrorState from './components/ErrorState/ErrorState';
import EmptyState from './components/EmptyState/EmptyState';
import { User, FileText, LogOut, ArrowLeft } from 'lucide-react';
import fallbackData from './data/movesData.json';
import './App.css';

const API_URL = 'https://apis2.ccbp.in/packers-and-movers/packers-and-movers-details';

export default function App() {
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeNav, setActiveNav] = useState('my-moves');
  const [expandedMoves, setExpandedMoves] = useState({});

  const fetchMoves = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to load data (HTTP ${response.status})`);
      }
      const data = await response.json();
      if (data && Array.isArray(data.Customer_Estimate_Flow)) {
        setMoves(data.Customer_Estimate_Flow);
      } else {
        throw new Error('Unexpected data format received from the server.');
      }
    } catch (err) {
      if (fallbackData && Array.isArray(fallbackData.Customer_Estimate_Flow)) {
        setMoves(fallbackData.Customer_Estimate_Flow);
      } else {
        setError(err.message || 'An error occurred while fetching move details.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function startFetching() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to load data (HTTP ${response.status})`);
        }
        const data = await response.json();
        if (!ignore) {
          if (data && Array.isArray(data.Customer_Estimate_Flow)) {
            setMoves(data.Customer_Estimate_Flow);
          } else {
            throw new Error('Unexpected data format received from the server.');
          }
        }
      } catch (err) {
        if (!ignore) {
          if (fallbackData && Array.isArray(fallbackData.Customer_Estimate_Flow)) {
            setMoves(fallbackData.Customer_Estimate_Flow);
          } else {
            setError(err.message || 'An error occurred while fetching move details.');
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    startFetching();

    return () => {
      ignore = true;
    };
  }, []);

  const toggleMoveExpand = (estimateId) => {
    setExpandedMoves((prev) => ({
      ...prev,
      [estimateId]: !prev[estimateId],
    }));
  };

  return (
    <div className="app-layout">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={(newNav) => setActiveNav(newNav)}
      />

      {/* Main Content Area */}
      <main className="main-content-area">
        <div className="content-container">
          {activeNav === 'my-moves' ? (
            <>
              {/* Header Title */}
              <header className="page-header">
                <h1 className="page-title">My Moves</h1>
              </header>

              {/* Dynamic Content Views */}
              {loading && <LoadingState />}

              {!loading && error && (
                <ErrorState error={error} onRetry={fetchMoves} />
              )}

              {!loading && !error && moves.length === 0 && (
                <EmptyState message="You currently have no scheduled moves." />
              )}

              {!loading && !error && moves.length > 0 && (
                <section className="moves-list-section" aria-label="Move Requests List">
                  {moves.map((move) => {
                    const isExpanded = Boolean(expandedMoves[move.estimate_id]);
                    return (
                      <MoveCard
                        key={move.estimate_id}
                        move={move}
                        isExpanded={isExpanded}
                        onToggleExpand={() => toggleMoveExpand(move.estimate_id)}
                      />
                    );
                  })}
                </section>
              )}
            </>
          ) : (
            /* Other Nav Views (Profile, Quote, Logout) */
            <div className="placeholder-nav-view">
              <button
                type="button"
                className="btn-back-to-moves"
                onClick={() => setActiveNav('my-moves')}
              >
                <ArrowLeft size={16} />
                <span>Back to My Moves</span>
              </button>

              {activeNav === 'my-profile' && (
                <div className="nav-panel-card">
                  <div className="nav-panel-icon"><User size={40} /></div>
                  <h2>My Profile</h2>
                  <p>Manage your account settings, contact information, and notifications.</p>
                </div>
              )}

              {activeNav === 'get-quote' && (
                <div className="nav-panel-card">
                  <div className="nav-panel-icon"><FileText size={40} /></div>
                  <h2>Get Instant Quote</h2>
                  <p>Calculate moving costs for your upcoming shifting requirements.</p>
                </div>
              )}

              {activeNav === 'logout' && (
                <div className="nav-panel-card">
                  <div className="nav-panel-icon"><LogOut size={40} /></div>
                  <h2>Logout Confirmation</h2>
                  <p>Are you sure you want to sign out of your account?</p>
                  <button
                    type="button"
                    className="btn-confirm-action"
                    onClick={() => setActiveNav('my-moves')}
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
