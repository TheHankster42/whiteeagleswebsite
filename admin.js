/**
 * White Eagles – Admin page: sign in and CRUD events via Supabase
 */
(function () {
    var config = window.SUPABASE_CONFIG;
    if (!config || !config.url || !config.anonKey || config.url.indexOf('YOUR_PROJECT') !== -1) {
        document.getElementById('admin-login-view').style.display = 'none';
        var warn = document.getElementById('admin-config-warn');
        if (warn) {
            warn.style.display = 'block';
            warn.textContent = 'Supabase is not configured. Edit supabase-config.js with your project URL and anon key, then run the SQL in supabase/schema.sql.';
        }
        document.getElementById('admin-dashboard-view').style.display = 'block';
        return;
    }

    var supabase = window.supabase.createClient(config.url, config.anonKey);

    var loginView = document.getElementById('admin-login-view');
    var dashboardView = document.getElementById('admin-dashboard-view');
    var loginForm = document.getElementById('admin-login-form');
    var loginError = document.getElementById('admin-login-error');
    var signOutBtn = document.getElementById('admin-sign-out');
    var addEventBtn = document.getElementById('admin-add-event');
    var eventsListEl = document.getElementById('admin-events-list');
    var formWrap = document.getElementById('admin-form-wrap');
    var formTitle = document.getElementById('admin-form-title');
    var eventForm = document.getElementById('admin-event-form');
    var eventIdInput = document.getElementById('admin-event-id');
    var formError = document.getElementById('admin-form-error');
    var listError = document.getElementById('admin-list-error');
    var formCancelBtn = document.getElementById('admin-form-cancel');

    function showView(loggedIn) {
        loginView.style.display = loggedIn ? 'none' : 'block';
        dashboardView.style.display = loggedIn ? 'block' : 'none';
        if (loggedIn) {
            loadEvents();
        }
    }

    function showLoginError(msg) {
        if (loginError) {
            loginError.textContent = msg || 'Sign in failed.';
            loginError.style.display = 'block';
        }
    }

    function hideLoginError() {
        if (loginError) loginError.style.display = 'none';
    }

    supabase.auth.getSession().then(function (result) {
        var session = result.data && result.data.session;
        showView(!!session);
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        hideLoginError();
        var email = document.getElementById('admin-email').value.trim();
        var password = document.getElementById('admin-password').value;
        if (!email || !password) {
            showLoginError('Please enter email and password.');
            return;
        }
        supabase.auth.signInWithPassword({ email: email, password: password })
            .then(function (result) {
                if (result.error) {
                    showLoginError(result.error.message);
                    return;
                }
                showView(true);
            })
            .catch(function (err) {
                showLoginError(err && err.message ? err.message : 'Sign in failed.');
            });
    });

    signOutBtn.addEventListener('click', function () {
        supabase.auth.signOut().then(function () {
            showView(false);
            formWrap.style.display = 'none';
        });
    });

    function formatDateForInput(iso) {
        if (!iso) return '';
        var d = new Date(iso);
        var pad = function (n) { return n < 10 ? '0' + n : n; };
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' +
            pad(d.getHours()) + ':' + pad(d.getMinutes());
    }

    function loadEvents() {
        listError.style.display = 'none';
        eventsListEl.innerHTML = '<p class="events-message">Loading…</p>';
        supabase.from('events').select('id, title, description, event_date, location').order('event_date', { ascending: true })
            .then(function (result) {
                if (result.error) {
                    listError.textContent = result.error.message;
                    listError.style.display = 'block';
                    eventsListEl.innerHTML = '';
                    return;
                }
                renderAdminList(result.data);
            })
            .catch(function (err) {
                listError.textContent = err && err.message ? err.message : 'Failed to load events.';
                listError.style.display = 'block';
                eventsListEl.innerHTML = '';
            });
    }

    function renderAdminList(events) {
        eventsListEl.innerHTML = '';
        if (!events || events.length === 0) {
            eventsListEl.innerHTML = '<p class="events-message">No events yet. Click “Add event” to create one.</p>';
            return;
        }
        var d = document;
        events.forEach(function (event) {
            var row = d.createElement('div');
            row.className = 'admin-event-row';
            var title = d.createElement('span');
            title.className = 'admin-event-row-title';
            title.textContent = event.title;
            var dateStr = event.event_date ? new Date(event.event_date).toLocaleString('en-CA', { timeZone: 'America/Edmonton' }) : '';
            var meta = d.createElement('span');
            meta.className = 'admin-event-row-meta';
            meta.textContent = dateStr;
            var actions = d.createElement('span');
            actions.className = 'admin-event-row-actions';
            var editBtn = d.createElement('button');
            editBtn.type = 'button';
            editBtn.className = 'admin-btn admin-btn-sm';
            editBtn.textContent = 'Edit';
            editBtn.setAttribute('data-id', event.id);
            var delBtn = d.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'admin-btn admin-btn-sm admin-btn-danger';
            delBtn.textContent = 'Delete';
            delBtn.setAttribute('data-id', event.id);
            editBtn.addEventListener('click', function () { openEditForm(event); });
            delBtn.addEventListener('click', function () { deleteEvent(event.id); });
            actions.appendChild(editBtn);
            actions.appendChild(delBtn);
            row.appendChild(title);
            row.appendChild(meta);
            row.appendChild(actions);
            eventsListEl.appendChild(row);
        });
    }

    function openAddForm() {
        eventIdInput.value = '';
        document.getElementById('admin-event-title').value = '';
        document.getElementById('admin-event-description').value = '';
        document.getElementById('admin-event-location').value = '';
        var now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        document.getElementById('admin-event-date').value = now.toISOString().slice(0, 16);
        formTitle.textContent = 'Add event';
        formError.style.display = 'none';
        formWrap.style.display = 'block';
    }

    function openEditForm(event) {
        eventIdInput.value = event.id;
        document.getElementById('admin-event-title').value = event.title || '';
        document.getElementById('admin-event-description').value = event.description || '';
        document.getElementById('admin-event-location').value = event.location || '';
        document.getElementById('admin-event-date').value = formatDateForInput(event.event_date);
        formTitle.textContent = 'Edit event';
        formError.style.display = 'none';
        formWrap.style.display = 'block';
    }

    function closeForm() {
        formWrap.style.display = 'none';
        formError.style.display = 'none';
    }

    addEventBtn.addEventListener('click', openAddForm);
    formCancelBtn.addEventListener('click', closeForm);

    function showFormError(msg) {
        formError.textContent = msg || 'Something went wrong.';
        formError.style.display = 'block';
    }

    eventForm.addEventListener('submit', function (e) {
        e.preventDefault();
        formError.style.display = 'none';
        var id = eventIdInput.value.trim();
        var title = document.getElementById('admin-event-title').value.trim();
        var description = document.getElementById('admin-event-description').value.trim();
        var location = document.getElementById('admin-event-location').value.trim();
        var dateVal = document.getElementById('admin-event-date').value;
        if (!title || !dateVal) {
            showFormError('Title and date are required.');
            return;
        }
        var eventDate = new Date(dateVal).toISOString();
        var payload = { title: title, description: description || null, location: location || null, event_date: eventDate };

        if (id) {
            supabase.from('events').update(payload).eq('id', id)
                .then(function (result) {
                    if (result.error) {
                        showFormError(result.error.message);
                        return;
                    }
                    closeForm();
                    loadEvents();
                })
                .catch(function (err) {
                    showFormError(err && err.message ? err.message : 'Update failed.');
                });
        } else {
            supabase.from('events').insert(payload)
                .then(function (result) {
                    if (result.error) {
                        showFormError(result.error.message);
                        return;
                    }
                    closeForm();
                    loadEvents();
                })
                .catch(function (err) {
                    showFormError(err && err.message ? err.message : 'Insert failed.');
                });
        }
    });

    function deleteEvent(id) {
        if (!confirm('Delete this event?')) return;
        supabase.from('events').delete().eq('id', id)
            .then(function (result) {
                if (result.error) {
                    listError.textContent = result.error.message;
                    listError.style.display = 'block';
                    return;
                }
                loadEvents();
            })
            .catch(function (err) {
                listError.textContent = err && err.message ? err.message : 'Delete failed.';
                listError.style.display = 'block';
            });
    }
})();
